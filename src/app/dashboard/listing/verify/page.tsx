"use client";

import { getBusiness } from "@/actions/businessActions";
import CustomButton from "@/components/ui/CustomButton";
import CustomInput from "@/components/ui/CustomInput";
import { useFeatureContext } from "@/context/feature/FeatureContext";
import { encodeToken } from "@/libs/customJWTToken";
import { sendConfirmationEmail } from "@/libs/nodeMailer";
import { getAuNdisProviderDetails } from "@/utils/ndisProviderDetails";
import { CheckCircleIcon } from "lucide-react";
// import Link from "next/link";
import { useEffect, useState } from "react";

type NdisProviderDetails = {
  name?: string;
  email?: string;
};

const Verify = () => {
  const { displayAlert } = useFeatureContext();

  const [docId, setDocId] = useState<string>("");
  const [ndisRegistered, setNdisRegistered] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [ndisProviderList, setNdisProviderList] = useState<
    NdisProviderDetails[] | null
  >(null);
  const [provider, setProvider] = useState<NdisProviderDetails>({
    name: "",
    email: "",
  });

  const setInitialData = async () => {
    const resp = await getBusiness(["_id", "ndis_registered"]);

    const data = JSON.parse(resp);
    setDocId(data.data?._id);
    setNdisRegistered(data.data.ndis_registered);
  };

  useEffect(() => {
    setInitialData();
  }, []);

  const sendVerificationEmail = async () => {
    setLoading(true);
    const token = await encodeToken({ id: docId });
    if (provider.email) {
      const res = await sendConfirmationEmail(provider.email, token);
      if (res) {
        displayAlert("Email Sent! Please Check your inbox.", true);
      } else {
        displayAlert("Error Sending Email!.", true);
      }
    } else {
      displayAlert("No Email Selected", false);
    }
    setLoading(false);
  };

  const searchNdisProvider = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2) {
      const ndisDetails = await getAuNdisProviderDetails(e.target.value);
      setNdisProviderList(ndisDetails);
      return;
    }
    setNdisProviderList(null);
  };
  return (
    <div>
      {!ndisRegistered ? (
        <div>
          <h1 className=" text-3xl font-semibold my-6">
            NDIS Provider Verification
          </h1>
          <div>
            <p className="text-xs mb-1">
              *Write the provider name (At least 3 characters)
            </p>

            <CustomInput
              name="ndis_provider"
              className=" md:w-[400px]"
              onChange={searchNdisProvider}
            />
            {ndisProviderList && (
              <div className=" w-[400px] h-[150px] overflow-y-scroll mt-2 flex flex-col gap-2">
                {ndisProviderList.map((p, i) => {
                  return (
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        setProvider(p);
                        setNdisProviderList(null);
                      }}
                      key={i}
                    >
                      {p.name}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
          <div className=" mt-4">
            <h1 className=" text-2xl font-semibold">
              Selected Provider Details:
            </h1>
            {provider.name ? (
              <>
                <p className="text-lg">
                  <span className=" font-semibold mr-1">Name:</span>
                  {provider.name}
                </p>
                <p className="text-lg">
                  <span className=" font-semibold mr-1">Email:</span>
                  {provider.email}
                </p>
                <p className="text-xs">
                  {/* The email address shown below is linked to your ABN as
                  registered with NDIS */}
                  Note: This is the official email address listed with NDIS for
                  your business. To complete your registration and verify your
                  NDIS provider status, a verification email will be sent to
                  this address. <br></br>
                  Once your email is verified, you will be awarded the
                  &apos;NDIS Registered Provider&apos; badge. This badge will be
                  displayed on your posts and directory listing, signifying your
                  verified status as an NDIS provider.
                </p>
                <p></p>
                <CustomButton
                  disabled={loading}
                  className=" my-4"
                  isLoading={loading}
                  onClick={sendVerificationEmail}
                >
                  Send Verification Email
                </CustomButton>
              </>
            ) : (
              <span>No Provider selected </span>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="  flex justify-center items-center flex-col rounded-lg shadow-lg py-10 px-20">
            <CheckCircleIcon color="green" size={150} />
            <h1 className=" text-2xl"> Congratulations</h1>
            <h1 className=" text-2xl">NDIS Verification Complete</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verify;

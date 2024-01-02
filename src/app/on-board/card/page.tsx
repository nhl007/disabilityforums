"use client";

import { getBusiness, updateBusinessData } from "@/actions/businessActions";
import CustomButton from "@/components/ui/CustomButton";
import CustomInput from "@/components/ui/CustomInput";
import SmallVerificationBox from "@/components/ui/SmallVerificationBox";
import { useFeatureContext } from "@/context/feature/FeatureContext";
import { uploadImage } from "@/libs/cloudinary";
import { decodeToken, encodeToken } from "@/libs/customJWTToken";
import { sendConfirmationEmail } from "@/libs/nodeMailer";
import { serviceLocationsType } from "@/types/business";
import { getAuNdisProviderDetails } from "@/utils/ndisProviderDetails";
import { MapPin, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type NdisProviderDetails = {
  name?: string;
  email?: string;
};

const Card = () => {
  const router = useRouter();
  const { displayAlert } = useFeatureContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [ndisProviderList, setNdisProviderList] = useState<
    NdisProviderDetails[] | null
  >(null);
  const [provider, setProvider] = useState<NdisProviderDetails>({});

  const [docId, setDocId] = useState<string>("");
  const [BusinessName, setBusinessName] = useState("Business Name");
  const [BusType, setBusType] = useState("Business Name");
  const [imagePreview, setImagePreview] = useState("");
  const [serviceLocations, setServiceLocations] =
    useState<serviceLocationsType>([]);
  const [blurb, setBlurb] = useState("");
  const [rank, setRank] = useState("");
  const [ndisRegistered, setNdisRegistered] = useState(false);
  const [image, setImage] = useState({
    banner: "",
    card: "",
    avatar: "",
  });

  const saveImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileData = e.target.files?.[0];
    const fileReader = new FileReader();
    // const name = e.target.files?.[0].name;
    if (fileData) {
      fileReader.readAsDataURL(fileData);
      fileReader.onloadend = async () => {
        // const imageData = await saveBase64Image(
        //   fileReader.result as string,
        //   "name"
        // );
        // setImage(imageData);
        setImagePreview(fileReader.result as string);
        const url = await uploadImage(fileReader.result as string);
        if (url) {
          setImage({ ...image, card: url });
        }
      };
    }
  };

  const setInitialData = async () => {
    const resp = await getBusiness([
      "blurb",
      "serviceLocations",
      "BusinessName",
      "image",
      "_id",
      "rank",
      "EntityTypeCode",
      "ndis_registered",
    ]);

    const data = JSON.parse(resp);

    setServiceLocations(
      data.data?.serviceLocations.length ? data.data.serviceLocations : []
    );

    setDocId(data.data?._id);
    setBlurb(data.data.blurb ? data.data.blurb : "");
    setBusinessName(data.data.BusinessName.join(" "));
    setImage(data.data?.image);
    setBusType(data.data.EntityTypeCode);
    setRank(data.data.rank);
    setNdisRegistered(data.data.ndis_registered);
  };

  useEffect(() => {
    setInitialData();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const infos = {
      blurb,
      image: image,
    };
    const data = await updateBusinessData(infos);
    if (data.success) {
      displayAlert(data.message, true);
      // router.push("/on-board/new");
    } else {
      displayAlert(data.message, false);
    }
    setLoading(false);
  };

  const sendVerificationEmail = async () => {
    setLoading(true);
    const token = await encodeToken({ id: docId });
    const res = await sendConfirmationEmail("apar.asif.an@gmail.com", token);
    if (res) {
      displayAlert("Email Sent! Please Check your inbox.", true);
    } else {
      displayAlert("Error Sending Email!.", true);
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
      <div className=" grid grid-flow-col grid-cols-3 gap-x-10">
        <div className="col-span-2 flex flex-col ">
          <div className=" flex gap-2 items-center mt-2">
            <div className="w-[300px] flex items-start justify-center flex-col">
              <label
                htmlFor="file_input"
                className="block text-sm font-medium leading-6 mb-2 text-gray-900"
              >
                Listing card Image
              </label>
              <input
                className=" py-2 px-4 block md:w-full text-sm text-white rounded-md cursor-pointer bg-btn-orange focus:outline-none"
                id="file_input"
                type="file"
                accept=".svg,.png,.jpg"
                onChange={saveImage}
              />
            </div>
            <button
              title="clear"
              className=" text-red-500 self-end flex items-center bg-gray-400 rounded-md px-4 py-2 hover:bg-red-500 hover:text-white"
              onClick={() => {
                setImagePreview("");
              }}
            >
              <X />
            </button>
          </div>
          <div className=" my-4">
            <label
              htmlFor="blurb"
              className="block text-sm font-medium leading-6 mb-2 text-gray-900"
            >
              Blurb (Maximum 143 Characters)
            </label>

            <div className="mt-2">
              <textarea
                id="blurb"
                name="blurb"
                rows={3}
                maxLength={143}
                className="block md:w-[700px] rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none outline-none placeholder:text-gray-400  text-sm md:text-base sm:leading-6"
                value={blurb}
                onChange={(e) => setBlurb(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* //! preview  */}
        <div className=" col-span-1 w-full min-h-[326px]">
          <h1 className=" text-3xl font-semibold mb-4">Preview</h1>
          <div className="w-[281px] h-[326px] flex flex-col gap-3 items-start">
            <div className="w-[281px] h-[200px] overflow-hidden">
              {imagePreview ? (
                <Image
                  className="rounded-md w-[281px] h-[200px]"
                  src={imagePreview}
                  alt="business"
                  width={281}
                  height={200}
                />
              ) : image && image.card ? (
                <Image
                  className="rounded-md w-[281px] h-[200px]"
                  src={image.card}
                  alt="business"
                  width={281}
                  height={200}
                />
              ) : (
                <Image
                  className="rounded-md w-[281px] h-[200px]"
                  src="/image.webp"
                  alt="business"
                  width={281}
                  height={200}
                />
              )}
            </div>

            <p className=" text-sm h-5 font-semibold line-clamp-1 overflow-ellipsis">
              {BusinessName}
            </p>
            <div className="flex gap-2">
              <SmallVerificationBox className="py-1.5 px-3 text-sm font-semibold">
                {BusType === "PRV"
                  ? "Company"
                  : BusType === "IND"
                  ? "Sole Trader"
                  : BusType === "PTY"
                  ? "Company"
                  : BusType === "PRT"
                  ? "Partnership "
                  : BusType === "GOV"
                  ? "Government Entity"
                  : BusType === "SFND"
                  ? "Superannuation Fund"
                  : BusType === "NPF"
                  ? "Non-Profit Subtype"
                  : "Trust "}
              </SmallVerificationBox>
              {ndisRegistered && (
                <SmallVerificationBox>Ndis-Registered</SmallVerificationBox>
              )}
            </div>
            <p className="w-full h-[55px] line-clamp-3 text-[12px] break-words font-medium leading-4">
              {blurb}
            </p>

            <div className="flex justify-between w-full items-center">
              <div className="flex items-center">
                <MapPin className="mr-1" size={18} strokeWidth={2} />
                {serviceLocations.map((l, i) => {
                  const regex = /\(([^)]+)\)/;
                  const match = l.state.match(regex);
                  return (
                    <span className="text-sm font-semibold" key={i}>
                      {match?.[1]}
                      {i + 1 < serviceLocations.length ? ", " : ""}
                    </span>
                  );
                })}
              </div>
              <span className="font-semibold text-sm">Overall Rank {rank}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="my-6">
        <CustomButton
          isLoading={loading}
          onClick={handleSubmit}
          className=" w-40"
        >
          Save
        </CustomButton>
      </div>
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
                <span className="text-lg">Name: {provider.name}</span> <br></br>
                <span className="text-lg">Email: {provider.email}</span>
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
        <p>Already verified1</p>
      )}
    </div>
  );
};

export default Card;

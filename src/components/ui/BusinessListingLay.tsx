interface IBusinessListingLay {
  name: string;
  children: React.ReactNode;
  className: string;
}

const BusinessListingLay = ({
  name,
  className,
  children,
}: IBusinessListingLay) => {
  return (
    <div className="">
      <span className="text-4xl font-semibold">{name} Section</span>
      <div>
        <span>Editing Section</span>
      </div>
      <div>
        <span>Preview Section</span>
      </div>
    </div>
  );
};

export default BusinessListingLay;

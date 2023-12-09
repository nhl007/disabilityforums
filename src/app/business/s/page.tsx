const page = (params: any) => {
  return (
    <div>
      <h1>{params.searchParams.k}</h1>
      <h1>{params.searchParams.r}</h1>
      <h1>{params.searchParams.p}</h1>
      <h1>{params.searchParams.c}</h1>
    </div>
  );
};

export default page;

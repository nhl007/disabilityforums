import SearchBar from "@/components/SearchBar";

interface BusinessLayout {
  children: React.ReactNode;
}

const layout = ({ children }: BusinessLayout) => {
  return (
    <main>
      <SearchBar />
      {children}
    </main>
  );
};

export default layout;

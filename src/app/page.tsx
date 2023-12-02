import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <main>
      <section className=" bg-bg-banner py-12">
        <MaxWidthWrapper>
          <SearchBar />
        </MaxWidthWrapper>
      </section>
    </main>
  );
}

import Header from "@/components/global/Header";
import Wrapper from "@/components/global/Wrapper";
import Footer from "@/components/global/Footer";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Wrapper className="flex-1">{children}</Wrapper>
      {/* <Footer /> */}
    </div>
  );
};

export default HomeLayout;

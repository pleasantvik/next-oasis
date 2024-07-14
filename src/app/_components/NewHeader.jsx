import Logo from "./Logo";
import Navigation from "./Navigation";

function NewHeader() {
  return (
    <header className="border-b border-primary-900 px-8 py-5">
      <div
        className="flex  justify-between items-center max-w-7xl mx-auto"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default NewHeader;

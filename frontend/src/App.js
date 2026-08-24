import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import { Toaster } from "sonner";

function App() {
  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "minimal-toast",
          descriptionClassName: "minimal-toast__description",
        }}
      />
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;

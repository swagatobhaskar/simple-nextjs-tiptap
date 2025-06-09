import Image from "next/image";
import ContentForm from './components/rte-form'

export default function Home() {
  return (
    <div className="m-auto w-2/3 flex-1 items-center align-middle content-center">
      <ContentForm />
    </div>
  );
}

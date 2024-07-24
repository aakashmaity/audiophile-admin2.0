import { DotLoader, MoonLoader } from "react-spinners";
import Layout from "./Layout";


export const Spinner = () => {
  return (
    <MoonLoader
        color="#36d7b7"
        speedMultiplier={0.6}
        size={45}
    />   
  )
}

export const Loader = () => {
  return(
    <Layout>
      <div className=" h-full w-full flex items-center justify-center">
        <DotLoader color="#3c55a9" size={60}/>
      </div>
    </Layout>
  )
}

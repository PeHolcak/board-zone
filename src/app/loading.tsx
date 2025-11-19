import Loader from "@/components/Loader"
import { loadingWrapper } from "./styles"

const LoadingPage = () => {
  return (
    <div className={loadingWrapper}>
      <Loader />
    </div>
  )
}

export default LoadingPage

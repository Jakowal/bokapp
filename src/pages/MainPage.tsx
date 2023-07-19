import {testDBConnection} from "../utils/cosmos-db.utils";
import {useEffect} from "react";


const MainPage = () => {

  useEffect(() => {
    testDBConnection()
  }, [])



  return (
    <>
    </>
  )
}

export default MainPage;
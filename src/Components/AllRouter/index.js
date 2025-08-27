import { router } from '../../Router';
import { useRoutes } from 'react-router-dom'


function AllRouter() {
  const elements = useRoutes(router);
  return (
    <>
      {elements}
    </>
  )
}
export default AllRouter;
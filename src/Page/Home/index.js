import CompanyList from "../../CompanyList";
import SearchForm from "../../SearchFrom";
import SkillList from "../../SkillList";

function Home() {
  return (
    <>
      <SearchForm />
      <SkillList />
      <CompanyList />
    </>
  );
}
export default Home;
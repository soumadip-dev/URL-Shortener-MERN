import UrlShortner from '../components/UrlForm';
import UserUrl from '../components/UserUrl';

const DashboardPage = () => {
  return (
    <div className="flex flex-row justify-center ">
      <div className="flex-1">
        <UrlShortner />
      </div>
      <div className="flex-2">
        <UserUrl />
      </div>
    </div>
  );
};

export default DashboardPage;

import UrlShortner from '../components/UrlShortner';
import UserUrl from '../components/UserUrl';

const DashboardPage = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-1">
      {/* UrlShortner on top for small screens */}
      <div className="flex-1">
        <UrlShortner />
      </div>
      {/* UserUrl below for small screens */}
      <div className="flex-1">
        <UserUrl />
      </div>
    </div>
  );
};

export default DashboardPage;

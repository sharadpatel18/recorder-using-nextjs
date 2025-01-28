import Recorder from './Recorder';

function MyPage() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Audio Recorder</h1>
      <Recorder className="w-full max-w-md" />
    </div>
  );
}

export default MyPage;
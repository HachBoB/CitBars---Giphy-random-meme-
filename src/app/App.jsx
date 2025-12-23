import { MemeListPage } from '../pages/MemeListPage/MemeListPage.jsx';

function App() {
    return (
        <div className="min-h-screen text-white bg-cover bg-center bg-no-repeat relative bg-cover bg-center "
             style={{ backgroundImage: "url('https://avatars.mds.yandex.net/get-mpic/11368570/2a0000018b434b83d25e63491f77b88710ed/orig')" }}>
            <div className="absolute inset-0 bg-black/70" />
            <main className="relative mx-auto p-4">
                <MemeListPage />
            </main>
        </div>
    );
}

export default App;

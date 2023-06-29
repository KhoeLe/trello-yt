import Board from "@/components/Board";
import Header from "@/components/Header";
import Modal from "@/components/Modal";

export default async function Home() {

    return (
        <main>
            {/* Header */}
            <Header />

            <Board />
            {/* Board */}
            <h1>Hello World ! To day I am develop Trello</h1>

        </main>
    );
}

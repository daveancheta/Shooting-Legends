import { Button } from "@/components/ui/button";
import { Crosshair } from "lucide-react";

interface GameOverProps {
    finalScore: number;
    restart: () => void;
}
const GameOver = ({ finalScore, restart }: GameOverProps) => {
    return (
        <div className="h-screen bg-black/70 flex justify-center items-center cursor-default">
            <div className="bg-none flex flex-col items-center justify-center select-none gap-4">
                <p className="text-destructive/90 text-center text-4xl">GAME OVER</p>


                <div className="bg-linear-to-br from-amber-500 to-amber-700 p-3 rounded-lg shadow-lg border-2 border-amber-400/50 backdrop-blur-sm select-none">
                    <div className="flex flex-row gap-3 items-center">
                        <div className="relative">
                            <Crosshair className="size-10 text-white drop-shadow-md" />
                            <div className="absolute inset-0 bg-amber-300/20 rounded-full blur-md" />
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-bold text-white tracking-wider drop-shadow-md transition-all duration-300 hover:scale-110">
                                {finalScore}
                            </span>
                            <p className="text-sm font-semibold text-amber-100 uppercase tracking-wide">
                                Final Score
                            </p>
                        </div>
                    </div>
                </div>

                <Button className="max-w-40" variant={'destructive'} onClick={() => {
                    restart()
                }}>
                    Play Again
                </Button>
            </div>
        </div>
    )
}

export default GameOver
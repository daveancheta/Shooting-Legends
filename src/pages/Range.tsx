import { Button } from "@/components/ui/button"
import { Crosshair, Settings2, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import GameOver from "./GameOver"

// todo: add start button - done
// todo: add stop button - done
// todo: add reset speed button - done
// todo: add crosshair - done
// todo: add fire sound - done
// todo: add scoreboard - done
// todo: add +1 score if successfully hit the target - done
// todo: add bullet - done
// todo: add hit animation - done
// todo: add game over if run out of ammo - done
// todo: add cursor option
// todo: add settings for difficulty

function Range() {
    const DarkPaladin = useRef<HTMLImageElement | null>(null)
    const Wraith = useRef<HTMLImageElement | null>(null)
    const crosshair = useRef<HTMLDivElement | null>(null)
    const [isMatchStarted, setIsMatchStarted] = useState(false)
    const animationFrameId = useRef<number | null>(null)
    const [score, setScore] = useState(0)
    let MAX_BULLET = 47
    const [bullet, setBullet] = useState(MAX_BULLET)
    const startButton = useRef<HTMLButtonElement | null>(null)
    const [hitmark, setHitmark] = useState(false)
    const [category, setCategory] = useState<string | null>(null)
    const [difficulty, setDifficulty] = useState<number>(1)
    const leftPos = useRef<number>(10)
    const rightPos = useRef<number>(10)
    const [isShowSettings, setIsShowSettings] = useState(false)
    let speed = difficulty

    const mouseX = useRef<number>(0)
    const mouseY = useRef<number>(0)

    useEffect(() => {
        const autoRun = () => {
            leftPos.current += speed;
            rightPos.current += speed;

            if (DarkPaladin.current) {
                DarkPaladin.current.style.left = leftPos.current + "px"
            }

            if (Wraith.current) {
                Wraith.current.style.right = rightPos.current + "px"
            }

            if (leftPos.current > window.innerWidth) {
                leftPos.current = -110;
            }

            if (rightPos.current > window.innerWidth) {
                rightPos.current = -110;
            }

            animationFrameId.current = requestAnimationFrame(autoRun)
        }


        if (isMatchStarted) autoRun();

        document.body.addEventListener("mousemove", (e) => {
            mouseX.current = e.clientX
            mouseY.current = e.clientY

            if (crosshair.current) {
                crosshair.current.style.left = mouseX.current + "px"
                crosshair.current.style.top = mouseY.current + "px"
            }

        })

    }, [isMatchStarted])

    useEffect(() => {
        if (!isMatchStarted) return;
        if (bullet <= 0) return;

        document.addEventListener("click", shoot)

        return () => {
            document.removeEventListener("click", shoot)
        }

    }, [isMatchStarted, bullet])

    const shoot = (e: any) => {

        if (e.target.tagName === "BUTTON") return;

        const gunshotSoundEffect = new Audio("/sounds/gunshot.MP3")
        gunshotSoundEffect.play()

        setBullet(b => Math.max(0, b - 1))
    }

    const shootLeftPos = () => {
        speed += 0.1;
        leftPos.current = -110;
        setScore((score) => score += 1)
        setHitmark(true)
        setTimeout(() => {
            setHitmark(false)
        }, 200)
    }

    const shootRightPos = () => {
        speed += 0.1;
        rightPos.current = -110;
        setScore((score) => score += 1)
        setHitmark(true)
        setTimeout(() => {
            setHitmark(false)
        }, 200)
    }

    const resetMatch = () => {
        speed = 1;
        leftPos.current = 0;
        rightPos.current = 0;
        setScore(0)
        setBullet(MAX_BULLET)
        setIsMatchStarted(false)

        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current)
        }

        if (DarkPaladin.current) {
            DarkPaladin.current.style.left = "10px";
        }

        if (Wraith.current) {
            Wraith.current.style.right = "10px";
        }
    }


    return (
        <div>
            {bullet <= 0 &&
                <div className="inset-0 fixed z-9999">
                    <GameOver finalScore={score} restart={resetMatch} />
                </div>}
            <div ref={crosshair} className={`fixed flex items-center justify-center pointer-events-none z-50 ${bullet <= 0 && "hidden"}`}>
                <div className="relative w-6 h-6">
                    <div className={`absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 z-30 ${hitmark ? "bg-red-600" : "bg-white"}`} />
                    <div className={`absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 z-30 ${hitmark ? "bg-red-600" : "bg-white"}`} />
                    <Crosshair className={`absolute size-4 top-1/2 left-1 -translate-y-1/2 text-red-500 z-20 ${!hitmark && "opacity-0"}`} />
                </div>
            </div>

            <button onClick={() => setIsShowSettings(true)}
                className="fixed top-2 right-2 bg-linear-to-br from-amber-500 to-amber-700 p-3 
            rounded-lg shadow-lg border-2 border-amber-400/50 backdrop-blur-sm select-none cursor-none">
                <Settings2 />
            </button>

            <div className={`w-screen h-screen flex justify-center items-center transition-all duration-300 origin-top-right ${isShowSettings && !isMatchStarted ? "scale-100 opacity-100" : "opacity-0 scale-0"}`}>
                <div className="fixed bg-linear-to-br from-amber-500 to-amber-700 p-3 
            rounded-lg shadow-lg border-2 border-amber-400/50 backdrop-blur-sm select-none cursor-none min-w-120">
                    <div className="flex justify-between">
                        <h1>SETTINGS</h1>
                        <button className=" cursor-none"
                            onClick={() => setIsShowSettings(false)}><X /></button>
                    </div>
                    <hr />
                    <div className="bg-amber-900/30 mt-2 flex justify-between space-x-4 p-2 rounded-sm">
                        <button
                            className={`${category === "difficulty" || category === null ? "bg-amber-900/50" : ""} p-2 rounded-sm cursor-none flex-1`}
                            onClick={() => setCategory("difficulty")}
                        >Difficulty</button>
                        <button
                            className={`${category === "crosshair" && "bg-amber-900/50"} p-2 rounded-sm cursor-none flex-1`}
                            onClick={() => setCategory("crosshair")}
                        >Crosshair</button>
                    </div>
                    <div className='flex flex-col mt-2 gap-2'>
                        <button className={`cursor-none bg-green-500 p-1 py-3 rounded-sm hover:bg-green-600 ${difficulty === 1 && "bg-green-600"}`} onClick={() => setDifficulty(1)}>
                            <span className={`${difficulty === 1 && "underline"}`}>Easy</span>
                        </button>
                        <button className={`cursor-none bg-yellow-500 p-1 py-3 rounded-sm hover:bg-yellow-600 ${difficulty === 5 && "bg-yellow-600"}`} onClick={() => setDifficulty(5)}>
                            <span className={`${difficulty === 5 && "underline"}`}>Medium</span>
                        </button>
                        <button className={`cursor-none bg-red-500 p-1 py-3 rounded-sm hover:bg-red-600 ${difficulty === 10 && "bg-red-600"}`} onClick={() => setDifficulty(10)}>
                            <span className={`${difficulty === 10 && "underline"}`}>Hard</span>
                        </button>
                    </div>
                </div>
            </div>

            <img className="select-none" ref={DarkPaladin}
                draggable={false}
                style={{
                    position: "fixed",
                    top: "10px",
                    left: "10px",
                    width: "150px",
                    height: "150px",
                    background: "none"
                }}
                src="dark-paladin.png" alt="saitama"
                onClick={() => {
                    if (isMatchStarted)
                        shootLeftPos()
                }} />

            <img className="select-none" ref={Wraith}
                draggable={false}
                style={{
                    position: "fixed",
                    top: "150px",
                    right: "10px",
                    width: "150px",
                    height: "150px",
                }}
                src="wraith.png" alt="saitama"
                onClick={() => {
                    if (isMatchStarted)
                        shootRightPos()
                }} />

            <div className="fixed bottom-10 w-screen flex justify-center">
                <Button ref={startButton}
                    onClick={() => {
                        setIsMatchStarted(true)
                    }}
                    variant={'default'}
                    className={`cursor-none select-none ${isMatchStarted && "hidden"}`} draggable={false}>Start</Button>
                <div className="flex flex-row gap-2">

                    <Button
                        onClick={resetMatch}
                        variant={'destructive'}
                        className={`cursor-none select-none ${!isMatchStarted && "hidden"}`} draggable={false}>{bullet <= 0 ? "Game Over" : "Stop"}</Button>
                </div>
            </div>

            <div className="fixed bottom-2 left-2 bg-linear-to-br from-amber-500 to-amber-700 p-3 rounded-lg shadow-lg border-2 border-amber-400/50 backdrop-blur-sm select-none">
                <div className="flex flex-row gap-3 items-center">
                    <div className="relative">
                        <Crosshair className="size-10 text-white drop-shadow-md" />
                        <div className="absolute inset-0 bg-amber-300/20 rounded-full blur-md" />
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-white tracking-wider drop-shadow-md transition-all duration-300 hover:scale-110">
                            {score}
                        </span>
                        <p className="text-sm font-semibold text-amber-100 uppercase tracking-wide">
                            Score
                        </p>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-2 right-2 bg-linear-to-br from-amber-500 to-amber-700 p-3 rounded-lg shadow-lg border-2 border-amber-400/50 backdrop-blur-sm select-none">
                <div className="flex flex-row gap-3 items-center">
                    <div className="relative">
                        <img src="ak47.png" className="size-20 text-white drop-shadow-md" />
                        <div className="absolute inset-0 bg-amber-300/20 rounded-full blur-md" />
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-white tracking-wider drop-shadow-md transition-all duration-300 hover:scale-110">
                            {bullet}
                        </span>
                        <p className="text-sm font-semibold text-amber-100 uppercase tracking-wide">
                            Bullet
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Range
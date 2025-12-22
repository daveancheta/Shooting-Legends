import { Button } from "@/components/ui/button"
import { Crosshair } from "lucide-react"
import { useEffect, useRef, useState } from "react"

// todo: add start button - done
// todo: add stop button - done
// todo: add reset speed button - done
// todo: add crosshair - done
// todo: add fire sound - done
// todo: add scoreboard - done
// todo: add +1 score if successfully hit the target - done
// todo: add bullet
// todo: add hit animation
// todo: add game over if run out of ammo

function Range() {
    const saitama = useRef<HTMLImageElement | null>(null)
    const mario = useRef<HTMLImageElement | null>(null)
    const speed = useRef<number>(1)
    const crosshair = useRef<HTMLDivElement | null>(null)
    const [isMatchStarted, setIsMatchStarted] = useState(false)
    const animationFrameId = useRef<number | null>(null)
    const [score, setScore] = useState(0)
    let MAX_BULLET = 47
    const [bullet, setBullet] = useState(MAX_BULLET)
    const startButton = useRef<HTMLButtonElement | null>(null)

    const leftPos = useRef<number>(10)
    const rightPos = useRef<number>(10)

    const mouseX = useRef<number>(0)
    const mouseY = useRef<number>(0)

    useEffect(() => {
        const autoRun = () => {
            leftPos.current += speed.current;
            rightPos.current += speed.current;

            if (saitama.current) {
                saitama.current.style.left = leftPos.current + "px"
            }

            if (mario.current) {
                mario.current.style.right = rightPos.current + "px"
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
        speed.current += 0.1;
        leftPos.current = -110;
        setScore((score) => score += 1)
    }

    const shootRightPos = () => {
        speed.current += 0.1;
        rightPos.current = -110;
        setScore((score) => score += 1)
    }

    const resetMatch = () => {
        speed.current = 1;
        leftPos.current = 0;
        rightPos.current = 0;
        setScore(0)
        setBullet(MAX_BULLET)


        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current)
        }

        if (saitama.current) {
            saitama.current.style.left = "10px";
        }

        if (mario.current) {
            mario.current.style.right = "10px";
        }
    }

    return (
        <div>
            <div ref={crosshair} className="fixed flex items-center justify-center pointer-events-none z-50">
                <div className="relative w-6 h-6">
                    <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-white" />
                    <div className="absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 bg-white" />
                </div>
            </div>

            <img className="select-none" ref={saitama}
                draggable={false}
                style={{
                    position: "fixed",
                    top: "10px",
                    left: "10px",
                    width: "150px",
                    height: "150px"
                }}
                src="saitama.png" alt="saitama"
                onClick={isMatchStarted && shootLeftPos} />

            <img className="select-none" ref={mario}
                draggable={false}
                style={{
                    position: "fixed",
                    top: "150px",
                    right: "10px",
                    width: "150px",
                    height: "150px",
                }}
                src="mario.png" alt="saitama"
                onClick={isMatchStarted && shootRightPos} />

            <div className="fixed bottom-10 w-screen flex justify-center">
                <Button ref={startButton}
                    onClick={() => {
                        setIsMatchStarted(true)
                    }}
                    variant={'default'}
                    className={`cursor-none ${isMatchStarted && "hidden"}`} draggable={false}>Start</Button>
                <div className="flex flex-row gap-2">

                    <Button
                        onClick={() => {
                            resetMatch()
                            setIsMatchStarted(false)
                        }}
                        variant={'destructive'}
                        className={`cursor-none ${!isMatchStarted && "hidden"}`} draggable={false}>Stop</Button>
                </div>
            </div>

            <div className="fixed bottom-2 left-2 bg-gradient-to-br from-amber-500 to-amber-700 p-3 rounded-lg shadow-lg border-2 border-amber-400/50 backdrop-blur-sm">
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

            <div className="fixed bottom-2 right-2 bg-gradient-to-br from-amber-500 to-amber-700 p-3 rounded-lg shadow-lg border-2 border-amber-400/50 backdrop-blur-sm">
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
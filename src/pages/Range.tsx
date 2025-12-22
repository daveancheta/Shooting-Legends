import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"

// todo: add start button - done
// todo: add stop button - done
// todo: add reset speed button - done
// todo: add crosshair - done
// todo: add fire sound

function Range() {
    const saitama = useRef<HTMLImageElement | null>(null)
    const mario = useRef<HTMLImageElement | null>(null)
    const speed = useRef<number>(1)
    const crosshair = useRef<HTMLDivElement | null>(null)
    const [isMatchStarted, setIsMatchStarted] = useState(false)
    const animationFrameId = useRef<number | null>(null)

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
        if (isMatchStarted) {
            autoRun()
        } else {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current)
            }
        }

        document.body.addEventListener("mousemove", (e) => {
            mouseX.current = e.clientX
            mouseY.current = e.clientY

            if (crosshair.current) {
                crosshair.current.style.left = mouseX.current + "px"
                crosshair.current.style.top = mouseY.current + "px"
            }

        })
    })

    const shootLeftPos = () => {
        speed.current += 0.1;
        leftPos.current = -110;
    }

    const shootRightPos = () => {
        speed.current += 0.1;
        rightPos.current = -110;
    }

    const resetMatch = () => {
        speed.current = 1;
        leftPos.current = 0;
        rightPos.current = 0;

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
                onClick={shootLeftPos} />

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
                onClick={shootRightPos} />

            <div className="fixed bottom-10 w-screen flex justify-center">
                <Button
                    onClick={() => setIsMatchStarted(true)}
                    variant={'default'}
                    className={`cursor-none ${isMatchStarted && "hidden"}`} draggable={false}>Start</Button>
                <div className="flex flex-row gap-2">
                    <Button
                        onClick={() => setIsMatchStarted(false)}
                        variant={'default'}
                        className={`cursor-none ${!isMatchStarted && "hidden"}`} draggable={false}>Stop</Button>

                    <Button
                        onClick={() => {
                            resetMatch()
                            setIsMatchStarted(false)
                        }}
                        variant={'destructive'}
                        className={`cursor-none ${!isMatchStarted && "hidden"}`} draggable={false}>Reset</Button>
                </div>
            </div>
        </div>
    )
}
export default Range
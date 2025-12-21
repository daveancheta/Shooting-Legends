import { useEffect, useRef } from "react"

function Range() {
    const saitama = useRef<HTMLImageElement | null>(null)
    const mario = useRef<HTMLImageElement | null>(null)
    const speed = 1;

    const leftPos = useRef<number>(10)
    const rightPost = useRef<number>(10)

    useEffect(() => {

        const autoRun = () => {
            leftPos.current += speed;
            rightPost.current += speed;

            if (saitama.current) {
                saitama.current.style.left = leftPos.current + "px"
            }

            if (mario.current) {
                mario.current.style.right = rightPost.current + "px"
            }

            if (leftPos.current > window.innerWidth) {
                leftPos.current = -110;
            }

            if (rightPost.current > window.innerWidth) {
                rightPost.current = -110;
            }

            requestAnimationFrame(autoRun)
        }

        autoRun()

    })
    return (
        <div>
            <img ref={saitama}
                style={{
                    position: "fixed",
                    top: "10px",
                    left: "10px",
                    width: "150px",
                    height: "150px"
                }}
                src="saitama.png" alt="saitama" />
            <img ref={mario}
                style={{
                    position: "fixed",
                    top: "150px",
                    right: "10px",
                    width: "150px",
                    height: "150px"
                }}
                src="mario.png" alt="saitama" />
        </div>
    )
}

export default Range
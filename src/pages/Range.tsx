import { useEffect, useRef } from "react"

function Range() {
    const saitama = useRef<HTMLImageElement | null>(null)
    const mario = useRef<HTMLImageElement | null>(null)
    const speed = useRef<number>(1)

    const leftPos = useRef<number>(10)
    const rightPos = useRef<number>(10)

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

            requestAnimationFrame(autoRun)
        }
        autoRun()
    })

    const shootSaitama = () => {
        speed.current += 0.5;
        leftPos.current = -110;
    }

    const shootMario = () => {
        speed.current += 0.5;
        rightPos.current = -110;
    }

    return (
        <div>
            <img className="select-none" ref={saitama}
                style={{
                    position: "fixed",
                    top: "10px",
                    left: "10px",
                    width: "150px",
                    height: "150px"
                }}
                src="saitama.png" alt="saitama" 
                onClick={shootSaitama}/>
                
            <img className="select-none" ref={mario}
                style={{
                    position: "fixed",
                    top: "150px",
                    right: "10px",
                    width: "150px",
                    height: "150px",
                }}
                src="mario.png" alt="saitama" 
                onClick={shootMario}/>
        </div>
    )
}

export default Range
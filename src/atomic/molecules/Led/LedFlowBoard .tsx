import React, { useEffect, useState } from 'react';
import classes from './LedFlowBoard.module.scss';


const LedFlowBoard = ({ text }: { text: string }) => {
    const [animate, setAnimate] = useState<boolean>(false)
    const [hidd, setHidd] = useState<boolean>(true)
    const row: number = 250 * 20
    const divs = [];
    for (let i = row; i > 0; i--) {
        divs.push({ index: i })
    }

    useEffect(() => {
        setHidd(true)

        const set32 = setTimeout(() => {
            setHidd(false)
        }, 200)

        const set = setTimeout(() => {
            setAnimate(true)
        }, 500)
        return () => {
            setHidd(true)
            setAnimate(false)
            clearTimeout(set)
            clearTimeout(set32)
        }
    }, [text])

    return (
        <div
            style={{
                fontFamily: 'sans',
                fontStyle: 'italic',
                fontWeight: 600
            }}
            className="flex flex-wrap justify-end h-[60px] w-[100vw] min-w-[600px] bg-black overflow-hidden">
            {!hidd && <div className={` text-[40px]  ${hidd ? 'hidden' : 'absolute'} translate-y-2 z-[9] transform text-red-600 ${animate ? '' : 'translate-x-[100vw]'} duration-1000 justify-start`}>{text}</div>}
            {/* {divs?.map((item, index) =>
                <span key={index} className={classes.hole + '  bg-red-300/30 '}>
                </span>
            )} */}
            <div className={classes.patt + " h-[60px] w-[100vw]"}></div>
            {/* <span className={" m-[1px] bg-red-800 flex rounded-full w-[5px] h-[5px] "}></span> */}
        </div>
    );
};

export default LedFlowBoard;
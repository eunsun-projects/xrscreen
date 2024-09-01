import styles from "@/app/vas/[slug]/page.module.css"
import useLoadingCounter from "@/hooks/useLoadingState"

export default function VasIntro({title, setEnter}){

    const [counter] = useLoadingCounter();

    const handleEnter = () => {
        setEnter(true);
    }

    return(
        <div className={styles.intromenu}>
            <div className={styles.intromenubox}>
                <div className={styles.intromenucon}>

                    <div className={styles.intromenutitle}>
                        <h1>{title}</h1>
                    </div>

                    <div className={styles.vassubtitle}>
                        <p>Virtual Art Space Example</p>
                        <p>from screenxyz</p>
                    </div>

                    <div className={styles.instructions}>
                        <p>♥♡♥♡♥♡</p>
                        <p>방향키 혹은 W,A,S,D 키를</p>
                        <p>이용해 이동이 가능합니다</p>
                        <p>화면클릭 혹은 터치로 둘러볼 수 있습니다</p>
                    </div>

                    <div className={styles.playbtn} onClick={handleEnter}>{counter >= 4 ? 'ENTER' : "..loading.."}</div>

                </div>
            </div>
        </div>
    )
}
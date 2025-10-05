import styles from "./page.module.css";
import Map from "@/components/map/map";

export default function Home() {
  return (
    <div className={styles.page}>
      <Map />
    </div>
  );
}

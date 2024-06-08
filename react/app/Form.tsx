"use client";

import styles from "./Form.module.css";

import { useForm } from "react-hook-form";

export default function Form() {
  const { register, handleSubmit } = useForm();

    return (
        <div className={styles.formBody}>
            <p className={styles.formHeader}>Want to subscribe to our newsletter?</p>
            <form 
                className={styles.newspapperForm}
                onSubmit={handleSubmit((data) => {
                    alert(JSON.stringify(data));
                })}
            >
                <input {...register("firstName")} placeholder="First name" required className={styles.formChild} />
                <input {...register("lastName")} placeholder="Last name" required className={styles.formChild} />
                <input {...register("email")} placeholder="Email" required className={styles.formChild} />
                <select {...register("when")} required defaultValue={"default"} className={styles.formChild}>
                    <option value="default" disabled>How often?</option>
                    <option value="Every week">Every week ($129/year)</option>
                    <option value="Every month">Every month ($49/year)</option>
                </select>
                <input type="submit" value="Subscribe" className={`${styles.formChild} ${styles.submitBtn}`} />
            </form>
        </div>
    );
}

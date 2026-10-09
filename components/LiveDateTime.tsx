
"use client";

import { useEffect, useState } from "react";

export default function LiveDateTime() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      setDate(
        new Intl.DateTimeFormat("bn-BD", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date())
      );
    };

    updateDate();

    const timer = setInterval(updateDate, 60_000);

    return () => clearInterval(timer);
  }, []);

  return <span>{date || "তারিখ লোড হচ্ছে..."}</span>;
}
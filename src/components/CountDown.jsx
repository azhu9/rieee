/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

const TimeUnit = ({ label, value }) => {
  return (
    <div className="flex flex-col items-center bg-white shadow-md rounded-xl p-8 mx-2 w-25 mt-30">
      <span className="font-geist text-4xl font-bold text-blue-700">{value.toString().padStart(2, '0')}</span>
      <span className="text-sm text-gray-500 mt-1">{label}</span>
    </div>
  );
};

const CountDown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center items-center p-4">
      <TimeUnit label="Days" value={timeLeft.days} />
      <TimeUnit label="Hours" value={timeLeft.hours} />
      <TimeUnit label="Minutes" value={timeLeft.minutes} />
      <TimeUnit label="Seconds" value={timeLeft.seconds} />
    </div>
  );
};

export default CountDown;
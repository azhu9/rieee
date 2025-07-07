// import React from 'react'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqInfo = [
    {
    question: "What is IEEE?",
    answer: "IEEE, pronounced eye-triple-e, stands for Institute of Electrical and Electronics Engineers. IEEE is the world's largest technical professional organization, and it is dedicated to advancing technology for the benefit of humanity.",
    },
    {
    question: "Where is Rutgers IEEE located?",
    answer: "Our lab is located in room EE-04 in the Electrical Engineering building (ignore the authorized personnel only sign). However, all of our meetings are remote this semester. General meetings are on Wednesdays from 7:00 P.M. - 8:00 P.M., and division meeting schedules can be found on their respective pages. Join our Discord for more information.",
    },
    {
    question: "Who can join IEEE?",
    answer: "While IEEE contains the words 'Electrical and Electronics Engineers' in its name, we are open to any student passionate about technology. We have students from Computer Science, Mechanical Engineering, Biomedical Engineering, and even Biology involved in IEEE.",
    },
    {
    question: "Can I work on a personal project in the lab?",
    answer: "Yes! We welcome people to come to our lab during non-meeting times to work on personal projects or study. Look out for messages in the Discord to see when our lab is open!",
    },
    {
    question: "What does each division do?",
    answer: "Each division has projects and activities that you can get involved in to develop technical skills. We have Machine Learning/Artificial Intelligence, VEXU Robotics, Micromouse Robotics, Novice to Expert Coding (N2E), Embedded Systems Security (ESS), and Electronics divisions. More information about each division can be found on its respective page.",
    },
    {
    question: "What does each division do? When does each division meet?",
    answer: "Meeting times can be found on each division's page, and there is also a reference table on the contact page",
    },
    {
    question: "Can I be in more than one division?",
    answer: "Of course! We welcome our members to add some diversity and try as many of our divisions as they can.ting times can be found on each division's page, and there is also a reference table on the contact page.",
    },
]


const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto border-gray-200 border-1 rounded-2xl ">
      <h1 className="font-bold text-4xl p-7 bg-gray-200 rounded-t-xl">Frequently Asked Questions</h1>
      <div className="space-y-2 px-4">
        {faqInfo.map((faq, index) => (
          <div
            key={index}
            className="border-b border-gray-300 cursor-pointer"
            onClick={() => toggle(index)}
          >
            <div className="py-4">
              <p className="font-geist text-lg">{faq.question}</p>
            </div>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pb-4 text-gray-800 dark:text-gray-800">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
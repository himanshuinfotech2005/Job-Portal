import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FilterCard from './FilterCard';
import Job from './Job';
import Navbar from './shared/Navbar';

const pageVariants = {
    hidden: { opacity: 0, x: -80 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: 0.14
        }
    },
    exit: { opacity: 0, x: 80, transition: { duration: 0.4 } }
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const headingVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <motion.div
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <motion.h1
                    variants={headingVariants}
                    initial="hidden"
                    animate="visible"
                    className='font-bold text-2xl mb-8'
                >
                    All Jobs ({filterJobs.length})
                </motion.h1>
                <div className='flex gap-5'>
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className='w-20%'
                    >
                        <FilterCard />
                    </motion.div>
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <motion.div
                                    className='grid grid-cols-3 gap-4'
                                    variants={{
                                        visible: { transition: { staggerChildren: 0.14 } }
                                    }}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div key={job?._id} variants={cardVariants}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </motion.div>
                            </div>
                        )
                    }
                </div>
            </div>
        </motion.div>
    )
}

export default Jobs
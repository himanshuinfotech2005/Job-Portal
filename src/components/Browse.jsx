import useGetAllJobs from '@/hooks/useGetAllJobs';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Job from './Job';
import Navbar from './shared/Navbar';

// Animation variants
const pageVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.13
    }
  },
  exit: { opacity: 0, x: 60, transition: { duration: 0.4 } }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }
};

const Browse = () => {
    useGetAllJobs();
    const {allJobs, searchedQuery} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])
    
    const filteredJobs = searchedQuery
        ? allJobs.filter((job) =>
            job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        )
        : allJobs;

    return (
        <motion.div
          variants={pageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <motion.h1
                  className='font-bold text-xl my-10'
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  Search Results ({filteredJobs.length})
                </motion.h1>
                <motion.div
                  className='grid grid-cols-3 gap-4'
                  variants={{
                    visible: { transition: { staggerChildren: 0.13 } }
                  }}
                  initial="hidden"
                  animate="visible"
                >
                    {
                        filteredJobs.map((job) => (
                            <motion.div key={job._id} variants={cardVariants}>
                                <Job job={job}/>
                            </motion.div>
                        ))
                    }
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Browse
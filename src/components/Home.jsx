import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CategoryCarousel from './CategoryCarousel';
import HeroSection from './HeroSection';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import Navbar from './shared/Navbar';

const containerVariants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.15
    }
  }
};

const childVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

function Home() {
  useGetAllJobs();
  const {user}=useSelector(store=>store.auth);
  const navigate=useNavigate();
  useEffect(()=>{
    if(user?.role=='recruiter'){
      navigate("/admin/companies");
    }
  },[]);
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, x: 80, transition: { duration: 0.4 } }}
      className="overflow-hidden"
    >
        <motion.div variants={childVariants}><Navbar/></motion.div>
        <motion.div variants={childVariants}><HeroSection/></motion.div>
        <motion.div variants={childVariants}><CategoryCarousel/></motion.div>
        <motion.div variants={childVariants}><LatestJobs/></motion.div>
        <motion.div variants={childVariants}><Footer/></motion.div>
    </motion.div>
  )
}

export default Home
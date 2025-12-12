import useGetAppliedJobs from "@/hooks/useGetAppliedJobs"
import { motion } from "framer-motion"
import { Contact, Mail, Pen } from "lucide-react"
import { useState } from "react"
import { useSelector } from "react-redux"
import AppliedJobTable from "./AppliedJobTable"
import Navbar from "./shared/Navbar"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import UpdateProfileDialog from "./UpdateProfileDialog"

const isResume= true;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.25,
            delayChildren: 0.1
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 60 },
    visible: { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        transition: { type: "spring", stiffness: 70, damping: 16, duration: 0.7 }
    }
};

const headingVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

function Profile() {
    useGetAppliedJobs();
    const [open,setOpen]=useState(false);
    const {user}=useSelector(store=>store.auth);
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#6A38C2] via-[#F83002] to-black flex flex-col">
            <Navbar />
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center"
            >
                <motion.div
                    variants={cardVariants}
                    className="max-w-4xl w-full mx-auto bg-white/80 backdrop-blur-md border border-[#6A38C2]/20 rounded-3xl my-8 p-8 shadow-2xl"
                >
                    <div className="flex justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={user?.profile?.profilePhoto || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8kjNASp-t4VymZrnRo9hIMRSeTcWNarxbJw&s"} alt="profile" />
                            </Avatar>
                            <div>
                                <motion.h1
                                    variants={headingVariants}
                                    className="font-bold text-2xl bg-gradient-to-r from-[#6A38C2] via-[#F83002] to-black bg-clip-text text-transparent"
                                >
                                    {user?.fullname}
                                </motion.h1>
                                <p className="text-gray-700">{user?.profile.bio}</p>
                            </div>
                        </div>
                        <Button onClick={()=>setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                    </div>
                    <div className="my-5">
                        <div className="flex items-center gap-3 my-2">
                            <Mail />
                            <span>{user?.email}</span>
                        </div>
                        <div className="flex items-center gap-3 my-2">
                            <Contact />
                            <span>{user?.phoneNumber}</span>
                        </div>  
                    </div>
                    <div className="my-5">
                        <h1 className="font-semibold">Skills</h1>
                        <div className="flex items-center gap-1 flex-wrap">
                            {
                                user?.profile?.skills.length!==0 ? user?.profile?.skills.map((item,index)=><Badge key={index}>{item}</Badge>) : <span>NA</span>
                            }
                        </div>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label className="text-md font-bold">Resume</Label>
                        {
                            isResume ? <a target="blank" href={user?.profile?.resume} className="text-blue-500 w-full hover:underline cursor-pointer">{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                        }
                    </div>
                </motion.div>
                <motion.div
                    variants={cardVariants}
                    className="max-w-4xl w-full mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl mb-8"
                >
                    <motion.h1
                        variants={headingVariants}
                        className="font-bold text-xl my-5 bg-gradient-to-r from-[#6A38C2] via-[#F83002] to-black bg-clip-text text-transparent ml-6"
                    >
                        Applied Jobs
                    </motion.h1>
                    <AppliedJobTable/>
                </motion.div>
            </motion.div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile
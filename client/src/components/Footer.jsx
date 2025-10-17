import React from 'react'

export default function Footer() {
    return (
        <div className='text-[#737373] md:px-10'>
            <div className="py-20">
                <p className="">Developed by Ahmed Soliman</p>
                <p className="">Read about Netflix TV shows and movies and watch bonus videos</p>
            </div>
            <p className='pb-5'>Questions? Contact us</p>
            <div className="grid grid-cols-2 md:grid-cols-4 text-sm pb-10 max-w-5xl">
                <ul className='flex flex-col space-y-2'>
                    <li className=''>FAQ</li>
                    <li className=''>Investor Relations</li>
                    <li className=''>Privacy</li>
                    <li className=''>Speed Test</li>
                </ul>
                <ul className='flex flex-col space-y-2'>
                    <li className=''>Help Center</li>
                    <li className=''>Jobs</li>
                    <li className=''>Cookie Preferences</li>
                    <li className=''>Legal Notices</li>
                </ul>
                <ul className='flex flex-col space-y-2'>
                    <li className=''>Account</li>
                    <li className=''>Ways to Watch</li>
                    <li className=''>Coperate Information</li>
                    <li className=''>Only on Netflix</li>
                </ul>
                <ul className='flex flex-col space-y-2'>
                    <li className=''>Media Center</li>
                    <li className=''>Terms of Use</li>
                    <li className=''>Contact Us</li>
                </ul>
            </div>
        </div>
    )
}

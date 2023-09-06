import IconButtonLayout from '@/components/Discography/Header/IconButtonLayout';
import Icon from '@/components/UI/Icon';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
	return (
		<footer className='w-full bg-bg-color px-4 py-8 sm:px-8'>
			<div className='mt-8 flex flex-row justify-between gap-x-4'>
				<div className='flex w-full flex-wrap'>
					<div className='mb-8 mr-6 min-h-[50px] w-full md:w-[162px] lg:w-[214px]'>
						<ul className='flex flex-col'>
							<p className='mb-2 text-xl font-bold'>Company</p>
							<MyLink href='https://www.spotify.com/ar/about-us/contact/'>
								About
							</MyLink>
							<MyLink href='https://www.lifeatspotify.com/'>
								Jobs
							</MyLink>
							<MyLink href='https://newsroom.spotify.com/'>
								For the Record
							</MyLink>
						</ul>
					</div>
					<div className='mb-8 mr-6 min-h-[50px] w-full md:w-[162px] lg:w-[214px]'>
						<ul className='flex flex-col'>
							<p className='mb-2 text-xl font-bold'>
								Communities
							</p>
							<MyLink href='https://artists.spotify.com/'>
								For artists
							</MyLink>
							<MyLink href='https://developer.spotify.com/'>
								Developers
							</MyLink>
							<MyLink href='https://ads.spotify.com/'>
								Advertising
							</MyLink>
							<MyLink href='https://investors.spotify.com/'>
								Investors
							</MyLink>
							<MyLink href='https://spotifyforvendors.com/'>
								Vendors
							</MyLink>
						</ul>
					</div>
					<div className='mb-8 mr-6 min-h-[50px] w-full md:w-[162px] lg:w-[214px]'>
						<ul className='flex flex-col'>
							<p className='mb-2 text-xl font-bold'>
								Useful links
							</p>
							<MyLink href='https://support.spotify.com/'>
								Support
							</MyLink>
							<MyLink href='https://www.spotify.com/ar/download/'>
								Free mobile app
							</MyLink>
						</ul>
					</div>
				</div>
				<div className='mb-40 flex flex-1 flex-row gap-4'>
					<MyButtonLink href='https://instagram.com/spotify'>
						<Icon name='instagram' />
					</MyButtonLink>
					<MyButtonLink href='https://twitter.com/spotify'>
						<Icon name='twitter' />
					</MyButtonLink>
					<MyButtonLink href='https://www.facebook.com/Spotify'>
						<Icon name='facebook' />
					</MyButtonLink>
				</div>
			</div>
			<hr className='mb-6 border-white/10' />
			<div className='flex flex-wrap justify-between pt-4'>
				<div className='pb-4'>
					<MyLink
						className='mr-4'
						href='https://www.spotify.com/ar/legal/'
					>
						Legal
					</MyLink>
					<MyLink
						className='mr-4'
						href='https://www.spotify.com/ar/privacy/'
					>
						Privacy Center
					</MyLink>
					<MyLink
						className='mr-4'
						href='https://www.spotify.com/ar/legal/privacy-policy/'
					>
						Privacy Policy
					</MyLink>
					<MyLink
						className='mr-4'
						href='https://www.spotify.com/ar/legal/cookies-policy/'
					>
						Cookies
					</MyLink>
					<MyLink
						className='mr-4'
						href='https://www.spotify.com/ar/legal/cookies-policy/#s3'
					>
						About Ads
					</MyLink>
					<MyLink
						className='mr-4'
						href='https://www.spotify.com/ar/accessibility/'
					>
						Accessibility
					</MyLink>
				</div>
				<p className='text-sm text-[#a7a7a7]'>© 2023 Spotify AB</p>
			</div>
		</footer>
	);
};

export default Footer;

const MyLink = ({
	href,
	children,
	className,
}: {
	href: string;
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<Link
			target='_blank'
			className={cn(
				'w-fit font-normal text-[#a7a7a7] transition-colors hover:text-white hover:underline',
				className
			)}
			href={href}
		>
			{children}
		</Link>
	);
};

const MyButtonLink = ({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) => {
	return (
		<Link href={href} target='_blank'>
			<IconButtonLayout className='h-10 w-10 bg-[rgb(41,41,41)] fill-white'>
				{children}
			</IconButtonLayout>
		</Link>
	);
};

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { BookOpen, BookMarked, BookPlus, Search } from 'lucide-react';
import bannerImage1 from '../../assets/images/bookBanner1.jpg';
import bannerImage2 from '../../assets/images/bookBanner2.jpg';
import bannerImage3 from '../../assets/images/bookBanner3.jpg';
import bannerImage4 from '../../assets/images/bookBanner4.jpg';
import { Link } from 'react-router-dom';
import { featuredBooks } from '../../utils/Books';
import { useEffect, useState } from 'react';
import axiosClient from '../../utils/Axios';

const services = [
	{ title: 'All Books', icon: <BookOpen className="w-6 h-6 text-white" /> },
	{ title: 'Trending Books', icon: <BookMarked className="w-6 h-6 text-white" /> },
	{ title: 'Request Books', icon: <BookPlus className="w-6 h-6 text-white" /> },
	{ title: 'Advanced Search', icon: <Search className="w-6 h-6 text-white" /> },
];

const categories = ['Fiction', 'Non-Fiction', 'Science', 'Biography', 'History', 'Technology', 'Fantasy', 'Mystery'];

const banners = [
	{ image: bannerImage1, alt: 'Banner 1' },
	{ image: bannerImage2, alt: 'Banner 2' },
	{ image: bannerImage3, alt: 'Banner 3' },
	{ image: bannerImage4, alt: 'Banner 4' },
];

export default function HomePage() {
	const [books, setBooks] = useState(featuredBooks);

	useEffect(() => {
		(async () => {
			try {
				const resp = await axiosClient.get(`${import.meta.env.VITE_API_BASE_URL}/api/books`);
				console.log(resp);
				setBooks((prev) => [...prev, ...resp.data]);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	return (
		<div className="p-4 space-y-10">
			{/* Banner Slider */}
			<Carousel autoPlay infiniteLoop showThumbs={false} className="rounded-box shadow">
				{banners.map((banner, index) => (
					<div key={index}>
						<img src={banner.image} alt={banner.alt} className="h-[30vh] md:h-[50vh] xl:h-[70vh] object-cover object-center" />
					</div>
				))}
			</Carousel>

			{/* Services */}
			<div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-4">
				{services.map((service, i) => (
					<div key={i} className="card shadow p-4 flex flex-row items-center space-x-4 hover:bg-base-200 transition">
						<div className="lg:h-16 lg:w-16 p-2 rounded-full flex items-center justify-center bg-primary text-white">{service.icon}</div>
						<p className="text-sm lg:text-lg font-semibold">{service.title}</p>
					</div>
				))}
			</div>

			{/* Featured Books */}
			<div>
				<h2 className="text-2xl font-bold mb-4">Featured Books</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
					{books.map((book, i) => (
						<Link to={`/books/${book.id}`} key={i} className="group">
							<div className="card bg-base-100 shadow p-4 h-full">
								<img src={book.cover} alt={book.title} className="w-36 h-64 mx-auto object-contain rounded" />
								<div className="mt-2">
									<h3 className="font-bold text-lg">{book.title}</h3>
									<p className="text-sm text-gray-500">Author: {book.author}</p>
									<p className="text-sm text-gray-500">Owner: {book.owner}</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>

			{/* Categories */}
			<div>
				<h2 className="text-2xl font-bold mb-4">Categories</h2>
				<div className="flex justify-center space-x-4 overflow-x-auto pb-2">
					{categories.map((cat, i) => (
						<div key={i} className="badge badge-primary badge-lg whitespace-nowrap px-6 py-3">
							{cat}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

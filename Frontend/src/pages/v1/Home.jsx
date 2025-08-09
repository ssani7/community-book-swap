import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { BookOpen, BookMarked, BookPlus, Flame } from 'lucide-react';
import bannerImage1 from '../../assets/images/bookBanner1.jpg';
import bannerImage2 from '../../assets/images/bookBanner2.jpg';
import bannerImage3 from '../../assets/images/bookBanner3.jpg';
import bannerImage4 from '../../assets/images/bookBanner4.jpg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BookList from '../../components/Books/BookList';

const services = [
	{ title: 'All Books', icon: <BookOpen className="w-6 h-6 text-white" />, link: '/all-books' },
	{ title: 'Trending Books', icon: <Flame className="w-6 h-6 text-white" />, link: '/all-books' },
	{ title: 'Requested Books', icon: <BookPlus className="w-6 h-6 text-white" />, link: '/my-book-requests' },
	{ title: 'My Books', icon: <BookMarked className="w-6 h-6 text-white" />, link: '/my-books' },
];

const banners = [
	{ image: bannerImage1, alt: 'Banner 1' },
	{ image: bannerImage2, alt: 'Banner 2' },
	{ image: bannerImage3, alt: 'Banner 3' },
	{ image: bannerImage4, alt: 'Banner 4' },
];

export default function HomePage() {
	const [books, setBooks] = useState([]);
	const [meta, setMeta] = useState(null); // pagination metadata
	const [page, setPage] = useState(1);
	const perPage = 4;

	useEffect(() => {
		(async () => {
			try {
				const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/get-books/?per_page=${perPage}&page=${page}`);
				console.log(res);
				if (res.data.data) {
					setBooks(res.data.data);
					setMeta({
						current_page: res.data.current_page,
						last_page: res.data.last_page,
					});
				} else {
					// Non-paginated
					setBooks(res.data);
					setMeta(null);
				}
				// setBooks((prev) => [...prev, ...resp?.data]);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [page]);
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
					<Link to={service.link} key={i} className="cursor-pointer">
						<div key={i} className="card shadow p-4 flex flex-row items-center space-x-4 hover:bg-base-200 transition">
							<div className="lg:h-16 lg:w-16 p-2 rounded-full flex items-center justify-center bg-primary text-white">{service.icon}</div>
							<p className="text-sm lg:text-lg font-semibold">{service.title}</p>
						</div>
					</Link>
				))}
			</div>

			{/* Featured Books */}
			<div>
				<h2 className="text-2xl font-bold mb-4 text-center">Featured Books</h2>
				<BookList perPage={6} featured={true} />
			</div>

			{/* footer */}
			<footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
				<nav>
					<h6 className="footer-title">Services</h6>
					<Link to="/all-books" className="link link-hover">
						Show All Books
					</Link>
					<Link to="/add-book" className="link link-hover">
						Add Books
					</Link>
				</nav>
				<nav>
					<h6 className="footer-title">Profile</h6>
					<Link to="/profile" className="link link-hover">
						Show Profile
					</Link>
					<Link to="/profile" className="link link-hover">
						Update Profile
					</Link>
				</nav>
				<nav>
					<h6 className="footer-title">Manage Books</h6>
					<Link to="/my-books" className="link link-hover">
						My Books
					</Link>
					<Link to="/my-book-requests" className="link link-hover">
						My Book Requests
					</Link>
				</nav>
			</footer>
		</div>
	);
}

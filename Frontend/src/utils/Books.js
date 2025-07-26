export const users = [
	{
		userId: 1,
		name: 'Alice Johnson',
		photoURL: 'https://randomuser.me/api/portraits/women/1.jpg',
		isPremium: true,
		location: 'New York, USA',
		reviews: ['Excellent borrower, very punctual!', 'Handled books with great care.', 'Friendly and reliable user.'],
		starRating: 4.8,
		totalReviews: 45,
	},
	{
		userId: 2,
		name: 'Bob Smith',
		photoURL: 'https://randomuser.me/api/portraits/men/2.jpg',
		isPremium: false,
		location: 'London, UK',
		reviews: ['Good communication throughout.', 'Friendly and trustworthy user.', 'Returned books in perfect condition.'],
		starRating: 4.3,
		totalReviews: 32,
	},
	{
		userId: 3,
		name: 'Clara Green',
		photoURL: 'https://randomuser.me/api/portraits/women/3.jpg',
		isPremium: true,
		location: 'Toronto, Canada',
		reviews: ['Very respectful of lending terms.', 'Quick responses and easy to work with.'],
		starRating: 4.7,
		totalReviews: 28,
	},
	{
		userId: 4,
		name: 'Daniel West',
		photoURL: 'https://randomuser.me/api/portraits/men/4.jpg',
		isPremium: false,
		location: 'Sydney, Australia',
		reviews: ['Reliable and punctual.', 'Would lend again without hesitation.'],
		starRating: 4.5,
		totalReviews: 21,
	},
	{
		userId: 5,
		name: 'Emily Carter',
		photoURL: 'https://randomuser.me/api/portraits/women/5.jpg',
		isPremium: true,
		location: 'Berlin, Germany',
		reviews: ['Very responsible borrower.', 'Great communication.', 'Books returned in excellent condition.'],
		starRating: 4.9,
		totalReviews: 37,
	},
	{
		userId: 6,
		name: 'Frank Miller',
		photoURL: 'https://randomuser.me/api/portraits/men/6.jpg',
		isPremium: false,
		location: 'Paris, France',
		reviews: ['Friendly and easy to contact.', 'Returned books on time.'],
		starRating: 4.1,
		totalReviews: 19,
	},
];

export const featuredBooks = [
	{
		bookId: 'gatsby001',
		cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1650033243i/41733839.jpg',
		title: 'The Great Gatsby',
		author: 'F. Scott Fitzgerald',
		owner: 'John Doe',
		publisher: "Charles Scribner's Sons",
		publishYear: 1925,
		edition: 'First Edition',
		condition: 'Very Old',
		summary:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dui justo, lobortis nec ex id, viverra iaculis augue. Morbi mollis vehicula arcu facilisis luctus. Fusce pulvinar elit quis est cursus gravida. Quisque pharetra arcu ac massa scelerisque cursus. Ut dapibus at mi ut suscipit. Nam gravida dignissim eleifend. Aenean vitae tincidunt justo. Vestibulum et elit posuere, vehicula lectus porttitor, lobortis ex. Vestibulum sed vestibulum nibh, id ornare lacus. Proin ultricies vestibulum convallis. Curabitur in libero sapien. Sed vel metus ut urna pellentesque vulputate ut eu diam. Integer et quam a turpis sodales tincidunt. Morbi ut sem hendrerit, vulputate est id.',
		ownersThoughts: 'A timeless masterpiece that explores wealth, love, and the American Dream. It made me reflect on the cost of chasing illusions.',
	},
	{
		bookId: 'mockingbird002',
		cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1742834040i/87783.jpg',
		title: 'To Kill a Mockingbird',
		author: 'Harper Lee',
		owner: 'Jane Smith',
		publisher: 'J. B. Lippincott & Co.',
		publishYear: 1960,
		edition: 'First Edition',
		condition: 'Old',
		summary:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dui justo, lobortis nec ex id, viverra iaculis augue. Morbi mollis vehicula arcu facilisis luctus. Fusce pulvinar elit quis est cursus gravida. Quisque pharetra arcu ac massa scelerisque cursus. Ut dapibus at mi ut suscipit. Nam gravida dignissim eleifend. Aenean vitae tincidunt justo. Vestibulum et elit posuere, vehicula lectus porttitor, lobortis ex. Vestibulum sed vestibulum nibh, id ornare lacus. Proin ultricies vestibulum convallis. Curabitur in libero sapien. Sed vel metus ut urna pellentesque vulputate ut eu diam. Integer et quam a turpis sodales tincidunt. Morbi ut sem hendrerit, vulputate est id.',
		ownersThoughts: 'This book opened my eyes to the importance of empathy and standing up for what is right.',
	},
	{
		bookId: '1984003',
		cover: 'https://www.penguin.co.uk/_next/image?url=https%3A%2F%2Fcdn.penguin.co.uk%2Fdam-assets%2Fbooks%2F9780141036144%2F9780141036144-jacket-large.jpg&w=614&q=100',
		title: '1984',
		author: 'George Orwell',
		owner: 'Alex Johnson',
		publisher: 'Secker & Warburg',
		publishYear: 1949,
		edition: 'First Edition',
		condition: 'Old',
		summary:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dui justo, lobortis nec ex id, viverra iaculis augue. Morbi mollis vehicula arcu facilisis luctus. Fusce pulvinar elit quis est cursus gravida. Quisque pharetra arcu ac massa scelerisque cursus. Ut dapibus at mi ut suscipit. Nam gravida dignissim eleifend. Aenean vitae tincidunt justo. Vestibulum et elit posuere, vehicula lectus porttitor, lobortis ex. Vestibulum sed vestibulum nibh, id ornare lacus. Proin ultricies vestibulum convallis. Curabitur in libero sapien. Sed vel metus ut urna pellentesque vulputate ut eu diam. Integer et quam a turpis sodales tincidunt. Morbi ut sem hendrerit, vulputate est id.',
		ownersThoughts: 'It’s a chilling warning of the dangers of authoritarianism. Still deeply relevant today.',
	},
	{
		bookId: 'atomic004',
		cover: 'https://baatighar.com/web/image/product.product/24347/image_1024',
		title: 'Atomic Habits',
		author: 'James Clear',
		owner: 'Sanaullah',
		publisher: 'Avery Publishing',
		publishYear: 2018,
		edition: '1st Edition',
		condition: 'Fresh',
		summary:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dui justo, lobortis nec ex id, viverra iaculis augue. Morbi mollis vehicula arcu facilisis luctus. Fusce pulvinar elit quis est cursus gravida. Quisque pharetra arcu ac massa scelerisque cursus. Ut dapibus at mi ut suscipit. Nam gravida dignissim eleifend. Aenean vitae tincidunt justo. Vestibulum et elit posuere, vehicula lectus porttitor, lobortis ex. Vestibulum sed vestibulum nibh, id ornare lacus. Proin ultricies vestibulum convallis. Curabitur in libero sapien. Sed vel metus ut urna pellentesque vulputate ut eu diam. Integer et quam a turpis sodales tincidunt. Morbi ut sem hendrerit, vulputate est id.',
		ownersThoughts: 'This book transformed the way I think about discipline and building routines. Highly actionable!',
	},
	{
		bookId: 'pather005',
		cover:
			'https://upload.wikimedia.org/wikipedia/bn/e/e3/%E0%A6%AA%E0%A6%A5%E0%A7%87%E0%A6%B0_%E0%A6%AA%E0%A6%BE%E0%A6%81%E0%A6%9A%E0%A6%BE%E0%A6%B2%E0%A7%80_%E0%A6%9A%E0%A6%B2%E0%A6%9A%E0%A7%8D%E0%A6%9A%E0%A6%BF%E0%A6%A4%E0%A7%8D%E0%A6%B0%E0%A7%87%E0%A6%B0_%E0%A6%AA%E0%A7%8B%E0%A6%B8%E0%A7%8D%E0%A6%9F%E0%A6%BE%E0%A6%B0.jpg',
		title: 'পথের পাঁচালী',
		author: 'বিভূতিভূষণ বন্দ্যোপাধ্যায়',
		owner: 'Amran Haque',
		publisher: 'Unknown / Local Publisher',
		publishYear: 1950,
		edition: 'First Bengali Edition',
		condition: 'Very Old',
		summary:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dui justo, lobortis nec ex id, viverra iaculis augue. Morbi mollis vehicula arcu facilisis luctus. Fusce pulvinar elit quis est cursus gravida. Quisque pharetra arcu ac massa scelerisque cursus. Ut dapibus at mi ut suscipit. Nam gravida dignissim eleifend. Aenean vitae tincidunt justo. Vestibulum et elit posuere, vehicula lectus porttitor, lobortis ex. Vestibulum sed vestibulum nibh, id ornare lacus. Proin ultricies vestibulum convallis. Curabitur in libero sapien. Sed vel metus ut urna pellentesque vulputate ut eu diam. Integer et quam a turpis sodales tincidunt. Morbi ut sem hendrerit, vulputate est id.',
		ownersThoughts: 'One of the most poetic and soulful books I’ve ever read. Deeply nostalgic and human.',
	},
	{
		bookId: 'advance006',
		cover: 'https://bdbiggapon.com/wp-content/uploads/classified-listing/2023/02/image_2023-02-09_014122116.png',
		title: 'Advance Learner’s (9-10) with solution',
		author: 'Chowdhury & Hossain',
		owner: 'Amran Haque',
		publisher: 'Local Bangladeshi Publisher',
		publishYear: 2023,
		edition: '1st Edition',
		condition: 'Fresh',
		summary:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dui justo, lobortis nec ex id, viverra iaculis augue. Morbi mollis vehicula arcu facilisis luctus. Fusce pulvinar elit quis est cursus gravida. Quisque pharetra arcu ac massa scelerisque cursus. Ut dapibus at mi ut suscipit. Nam gravida dignissim eleifend. Aenean vitae tincidunt justo. Vestibulum et elit posuere, vehicula lectus porttitor, lobortis ex. Vestibulum sed vestibulum nibh, id ornare lacus. Proin ultricies vestibulum convallis. Curabitur in libero sapien. Sed vel metus ut urna pellentesque vulputate ut eu diam. Integer et quam a turpis sodales tincidunt. Morbi ut sem hendrerit, vulputate est id.',
		ownersThoughts: 'Very helpful for board exam preparation. Covers everything in detail.',
	},
];

export const categories = [
	{ cid: 'fiction', name: 'Fiction' },
	{ cid: 'classic', name: 'Classic' },
	{ cid: 'novel', name: 'Novel' },
];

export const bookRequests = [
	{
		id: 1,
		userId: 1, // Alice Johnson
		reqBook: 'gatsby001',
		swapBookId: 'mockingbird002',
	},
	{
		id: 2,
		userId: 2, // Bob Smith
		reqBook: 'pather005',
		swapBookId: 'gatsby001',
	},
	{
		id: 3,
		userId: 3, // Clara Green
		reqBook: 'mockingbird002',
		swapBookId: '',
		lendOnly: true,
	},
	{
		id: 4,
		userId: 4, // Daniel West
		reqBook: '1984003',
		swapBookId: 'atomic004',
	},
];

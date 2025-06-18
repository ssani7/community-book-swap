import viteLogo from './assets/banner.jpg';
import './App.css';

function App() {
	return (
		<>
			<div>
				<h1>Welcome to Boi Nagar.</h1>
				<img src={viteLogo} style={{ width: '100%', maxHeight: '60vh', borderRadius: '2rem' }} alt="Vite logo" />
				<h1>Let's read books!</h1>
			</div>
			<div>
<hr class="dashed"></hr>
				<h1>This is an university Project by</h1>
				<h1>Team Ultron </h1>

			</div>

			<h1>Ultron Members</h1>

<table id="members">
  <tr>
    <th>Name</th>
    <th>ID</th>
  </tr>
  <tr>
    <td>Md Sanaullah</td>
    <td>221-15-4995</td>

  </tr>
  <tr>
    <td>Md Zahid Hasan Patwary</td>
    <td>221-15-4996</td>
  </tr>
  <tr>
    <td>Md Amran Haque</td>
    <td>221-15-5662</td>
  </tr>
  <tr>
    <td>Md Tahsinul Haque</td>
    <td>221-15-4661</td>
  </tr>
  <tr>
    <td>Md Shakibul Islam</td>
    <td>221-15-5551</td>
  </tr>
</table>
		</>
	);
}

export default App;

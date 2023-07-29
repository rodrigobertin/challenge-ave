import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
	const [images, setImages] = useState([])
	const [error, setError] = useState(null)
	const [column, setColumn] = useState(4)

	const createImages = (e) => {
		let cantidad = e.target.value;
		let arrayImages = []
		for (let i = 0; i < cantidad; i++) {
			arrayImages.push(`https://picsum.photos/800?random=${i}`)
		}

		if (cantidad >= 11) {
			setColumn(1)
		}
		if (cantidad >= 7 && cantidad < 12) {
			setColumn(2)
		}
		if (cantidad <= 3) {
			setColumn(4)
		}

		if (cantidad > 15) {
			setImages([]);
			setError('El máximo es 15')
		} else {
			setError(null)
			setImages(arrayImages)
		}
	}
	return (
		<>
			<div className="container-fluid">
				<div className="card my-3">
					<div className="card-body">
						<label htmlFor="">Imágenes cantidad</label>
						<input type="number"
									 min={1}
									 max={15}
									 className={'form-control'}
									 placeholder={'Cantidad de imágenes'}
									 onChange={createImages}/>
					</div>
				</div>
				<div className="card" style={{width: '100%'}}>
					<div className="card-body">
						{error && <p className={'text-danger'}>{error}</p>}
						<div className="row justify-content-center align-items-center">
							{images.map((image, index) => (
								<div key={index} className={`col-${column} mb-2`}>
									<img src={image} alt={index.toString()} className={'img-fluid'}/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default App

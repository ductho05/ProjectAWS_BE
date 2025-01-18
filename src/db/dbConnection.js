import mongoose from 'mongoose'

const connect = () => {
    mongoose.connect('mongodb+srv://ductho05:thodev2002@cluster0.unf8i8o.mongodb.net/projectAws?retryWrites=true&w=majority&appName=Cluster0')
        .then(() => console.log('Connected!'));
}

export default connect

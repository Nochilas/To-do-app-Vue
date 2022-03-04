//Questa pagina non c'era nel progetto base
//L'ho creata io leggendo docs su come fare il routing ma non ho idea di come mettere insieme i pezzi

module.exports = {
    pages: {
        index: {
          entry: 'src/main.js',

          template: 'index.html',

          filename: 'index.html',

          title: 'Home Page',

          chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        user: {
            entry: 'src/user/main.js',

            template: 'public/index.html',

            filename: 'user.html',

            title: 'User Page',

            chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
    }
}
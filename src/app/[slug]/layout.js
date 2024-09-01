import Providers from '../../store/provider' // 231112

export default function XrscreenLayout({children}){
    return(
        <Providers>
            {children}
        </Providers>
    )
} 
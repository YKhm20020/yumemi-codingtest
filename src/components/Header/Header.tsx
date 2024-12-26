type HeaderProps = {
    title: string; // ヘッダーに表示するタイトル
};

export const Header = ({ title }: HeaderProps) => {
    return (
        <header className='fixed top-0 left-0 right-0 bg-white shadow-md'>
            <div className='py-4'>
                <h1 className='text-3xl font-bold text-center'>{title}</h1>
            </div>
        </header>
    );
};

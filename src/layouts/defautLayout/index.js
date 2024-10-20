import cx from 'classnames';
import logo1 from '~/assests/img/logo1.png';
import logo2 from '~/assests/img/logo2.png';
import footer1 from '~/assests/img/footer1.png';
import footer2 from '~/assests/img/footer2.png';

function DefaultLayout({ children }) {
    return (
        <div className={cx("content bg-[url('../../assests/img/blankBg.png')] bg-cover w-screen h-screen")}>
            <div className={cx('flex justify-between items-center px-4 pt-4 fixed top-0 w-full')}>
                <img src={logo1} alt="Hội thi thủ lĩnh sinh viên" className={cx('h-16 object-cover')} />
                <img src={logo2} alt="Phần thi chân chung thủ lĩnh" className={cx('h-16 object-cover')} />
            </div>
            {children}
            <div className={cx('flex justify-between items-center fixed bottom-0 w-full z-10')}>
                <img src={footer2} alt="Hội thi thủ lĩnh sinh viên" className={cx('h-20 object-cover')} />
                <img src={footer1} alt="Phần thi chân chung thủ lĩnh" className={cx('h-20 object-cover')} />
            </div>
        </div>
    );
}

export default DefaultLayout;

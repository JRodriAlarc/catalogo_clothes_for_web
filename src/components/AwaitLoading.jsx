import style from './AwaitLoading.module.css'
import { LoadingSpinner } from './index'
export const AwaitLoading = () => {
  return (
    <div className={style['await-loading']}>
        <LoadingSpinner />
    </div>
  )
}

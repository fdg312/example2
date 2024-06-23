type ProfileType = {
    name: string | undefined
    createdAt: Date
}

export const ProfileDiv = ({ ...props }: ProfileType) => {
    return (
        <div className="p-2 border-2 border-[#555555] rounded-[10px]">
            <div className={`w-[48px] h-[48px] bg-black rounded-full mr-[10px] flex`}></div>
            <div>
                <p className='text-[20px] font-bold text-[#7AC751]'>{props.name}</p>
                <p className='text-[#555555] text-[14px] mt-[5px]'>Зарегистрирован: {props.createdAt.toISOString().split('T')[0].split('-').reverse().join('.')}</p>
            </div>
        </div>
    )
}
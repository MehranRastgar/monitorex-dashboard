import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DeviceManagement from "./DeviceManagement";
import UserManagement from "./UserManagement";
import ThemeButton from "../atoms/ThemeButton/ThemeButton";

const ManagementRouting = () => {
    const [value, setValue] = useState(0);
    const { t } = useTranslation();
    const [groupOrDevice, setGroupOrDevice] = useState<'user' | 'device'>(
        'device',
    );
    const [time, setTime] = useState<any>(

    );
    useEffect(() => {

    }, [time]);



    return <section >
        <div className="flex w-full justify-center">
            <ThemeButton
                className="mx-1"
                onClick={() => {
                    setTime(Date() + 'dvicem')
                    setGroupOrDevice('device')
                }}
                type={groupOrDevice === 'device' ? 'activate' : 'deactivate'}
            >
                {t('devices')}
            </ThemeButton>
            <></>
            <ThemeButton
                className="mx-1"
                onClick={() => {
                    setTime(Date() + 'userm')
                    setGroupOrDevice('user')
                }}
                type={groupOrDevice === 'user' ? 'activate' : 'deactivate'}

            >
                {t('users')}
            </ThemeButton>
        </div>
        <div className={"flex flex-wrap p-1 m-2"}>
            {groupOrDevice === 'device' && <DeviceManagement />}
            {groupOrDevice === 'user' && <UserManagement />}
        </div>
    </section>
}
export default ManagementRouting;
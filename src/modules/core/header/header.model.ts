export type CoreHeaderPredicate = () => void;

export class CoreHeaderItemClass {
    public Title: string;
    public DestinationURL: string;
    public OnClick: CoreHeaderPredicate;
    public ItemList: CoreHeaderItemClass[];

    public static CreateDropDown(title: string) {
        let Item: CoreHeaderItemClass = new CoreHeaderItemClass();
        Item.Title = title;
        Item.DestinationURL = null;
        Item.OnClick = null;
        Item.ItemList = new Array<CoreHeaderItemClass>();
        return Item;
    }

    public static CreateDestinationURL(title: string, destinationURL: string) {
        let Item: CoreHeaderItemClass = new CoreHeaderItemClass();
        Item.Title = title;
        Item.DestinationURL = destinationURL;
        Item.OnClick = null;
        Item.ItemList = null;
        return Item;
    }

    public static CreateClickEvent(title: string, onClick: CoreHeaderPredicate) {
        let Item: CoreHeaderItemClass = new CoreHeaderItemClass();
        Item.Title = title;
        Item.DestinationURL = null;
        Item.OnClick = onClick;
        Item.ItemList = null;
        return Item;
    }
}
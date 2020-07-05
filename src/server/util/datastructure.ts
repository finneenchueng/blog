type ICommonOpt = {
	[key: string]: unknown | ICommonOpt;
}
type ILinkListElement = ICommonOpt | string;

/**
 * 单向链表或双向链表中节点的构造函数
 * @param {ILinkListElement} element 要传入链表的节点
 */
class Node {
	public element: ILinkListElement;
	public prev: Node;
	public next: Node;
	constructor(element: ILinkListElement) {
		this.element = element;
		this.prev = null;
		this.next = null;
	}
}

/**
 * 单向链表
 */
export class LinkedList {
	private len: number; // 单向链表的长度
	private head: Node;  // 单向链表的头结点，初始化为NULL
	constructor() {
		this.len = 0;
		this.head = null;
	}
    /**
	 * 向单向链表尾部添加元素
	 * @param  {ILinkListElement} element 要加入链表的节点
	 */
	public append(element) {
		const node = new Node(element);
		let current;
		if (this.head == null) {
			this.head = node;
		} else {
			// 当前项等于链表头部元素.
			// while循环到最后一个，从而将该节点加入链表尾部。
			current = this.head;
			// 当next为null时，判定为false。退出循环。
			while (current.next) {
				current = current.next;
			}
			current.next = node;
		}
		this.len++;
	}

    /**
	 * 移除单向链表中某一个元素
	 * @param  {Number} position 要移除元素的位置
	 * @return {ILinkListElement}          移除成功返回被移除的元素，不成功则返回NULL
	 */
	public removeAt(position) {
		if (position > -1 && position < this.len) {
			let current = this.head;
			let previous;
			let index = 0;
			if (position === 0) {
				// 因为之前head指向第一个元素，现在把head修改为指向第二个元素。
				// 核心概念在于链表前后全靠指针链接，而非数组一般。
				// 所以只需要改变head的元素。
				this.head = current.next;
			} else {
				while (index++ < position) {
					// previous指要操作元素位置之前的那个元素，current表示之后的那个元素。
					previous = current;
					current = current.next;
				}
				previous.next = current.next;
			}
			this.len--;
			return current.element;
		}
		return null;
	}

    /**
	 * 清空所有元素
     * @return {Boolean}
	 */
	public empty(): boolean {
		if (this.len === 0) {
			return true;
		}
		let currentPosition = this.len - 1;
		while (currentPosition > -1) {
			const _element = this.removeAt(currentPosition);
			if (_element) {
				currentPosition--;
			} else {
				currentPosition = -1;
			}
		}
		return true;
	}

    /**
	 * 向单向链表中插入某个元素
	 * @param  {Number} position 要插入的位置
	 * @param  {ILinkListElement} element  要插入的元素
	 * @return {Boolean}          插入成功返回true，失败返回false
	 */
	public insert(position: number, element: ILinkListElement) {
		if (position >= 0 && position <= this.len) {
			const node = new Node(element);
			let current = this.head;
			let previous;
			let index = 0;
			if (position === 0) {
				node.next = current;
				this.head = node;
			} else {
				while (index++ < position) {
					previous = current;
					current = current.next;
				}
				previous.next = node;
				node.next = current;
			}
			this.len++;
			return true;
		} else {
			return false;
		}
	}

    /**
	 * 将链表所有内容以字符串输出
	 * @return {String} 要输出的字符串
	 * current.element+','  这边可以自行加 逗号或是 空格 
	 */
	public toString(linkStr?: string) {
		let current = this.head;
		let str = '';
		const _linkStr = linkStr || '';
		const initJson = {};
		let num = 0;
		while (current) {
			// str += (typeof current.element === 'string' ? current.element : JSON.stringify(current.element)) + _linkStr;
			const opt = current.element as ICommonOpt;
			for (const key in opt) {
				initJson[key] = opt[key];
			}
			current = current.next;
			num++;
		}
		console.log('num:', num)
		// return str;
		const result = JSON.stringify(initJson);
		return result.substring(1, result.length - 1);
	}

    /**
	 * 寻找某个元素在单向链表中的位置
	 * @param  {ILinkListElement} element 要寻找的元素
	 * @return {Number}         返回值>=0则代表找到相应位置
	 */
	public indexOf(element) {
		let current = this.head;
		let index = 0;
		while (current) {
			if (element === current.element) {
				return index;
			}
			index++;
			current = current.next;
		}

		return -1;
	}

    /**
	 * 移除给定的元素
	 * @param  {ILinkListElement} element 要移除的元素
	 * @return {Number}         返回值>=0表示移除成功
	 */
	public remove(element) {
		const index = this.indexOf(element);
		return this.removeAt(index);
	}

	/**
	 * 判断单向链表是否为空
	 * @return {Boolean} 为空则返回true，不为空则返回false
	 */
	public isAmpty() {
		return this.len === 0
	}

	/**
	 * 返回单向链表长度
	 * @return {Number} 单向链表的长度
	 */
	public size() {
		return this.len;
	}

	/**
	 * 获取单向链表的头部
	 * @return {ILinkListElement} 单向链表的头部
	 */
	public getHead() {
		return this.head;
	}

}

/**
 * 双向链表的构造函数
 */
export class DoublyLinkedList {

	//双向链表的长度
	private len: number;
	//双向链表的头结点，初始化为NULL
	private head: Node;
	//双向链表的尾结点，初始化为NULL
	private tail: Node;

	constructor() {
		this.len = 0;
		this.head = null;
		this.tail = null
	}
	/**
	 * 向链表尾部添加元素
	 * @param  {ILinkListElement} element 要加入链表的节点
	 * @return {Node}         加入链表的节点
	 */
	public append(element) {
		const node = new Node(element);

		if (this.head === null) {
			this.head = node;
			this.tail = node;
		} else {
			let previous;
			let current = this.head;

			while (current.next) {
				current = current.next;
			}

			current.next = node;
			node.prev = current;
			this.tail = node;
		}

		this.len++;
		return node;
	};

	/**
	 * 向链表中插入某个元素
	 * @param  {Number} position 要插入的位置
	 * @return {Boolean}         插入成功返回true，失败返回false
	 */
	public insert(position, element) {
		if (position >= 0 && position <= length) {
			const node = new Node(element);
			let index = 0;
			let previous;
			let current = this.head;

			if (position === 0) {

				if (this.head === null) {
					this.head = node;
					this.tail = node;
				} else {
					current.prev = node;
					node.next = current;
					this.head = node;
				}
			} else if (position === this.len) {

				current = this.tail;
				current.next = node;
				node.prev = current;
				this.tail = node;
			} else {

				while (index++ < position) {
					previous = current;
					current = current.next;
				}

				previous.next = node;
				node.prev = previous;
				current.prev = node;
				node.next = current;
			}

			this.len++;
			return true;
		} else {
			return false;
		}
	};

	/**
	 * 移除链表中某一个元素
	 * @param  {Number} position 要移除元素的位置
	 * @return 移除成功返回被移除的元素，不成功则返回false
	 */
	public removeAt(position) {
		if (position > -1 && position < this.len) {
			let current = this.head;
			let index = 0;
			let previous;

			if (position === 0) {
				this.head = current.next;

				if (this.len === 1) {
					this.tail = null;
					this.head.prev = null;
				}
			} else if (position === this.len - 1) {
				current = this.tail;
				this.tail = current.prev;
				this.tail.next = null;
			} else {
				while (index++ < position) {
					previous = current.prev;
					current = current.next;
				}
				previous.next = current.next;
				current.next.prev = previous;
			}

			this.len--;
			return current.element;
		} else {
			return false;
		}
	};

	/**
	 * 获取链表的头部
	 * @return {Node} 链表的头部
	 */
	public showHead() {
		return this.head;
	};

	/**
	 * 获取链表长度
	 * @return {Number} 链表长度
	 */
	public showLength() {
		return this.len;
	};

	/**
	 * 获取链表尾部
	 * @return {Node} 链表尾部
	 */
	public showTail() {
		return this.tail;
	}
}